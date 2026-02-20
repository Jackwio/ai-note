import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig, type DefaultTheme } from 'vitepress'

const configFile = fileURLToPath(import.meta.url)
const vitepressDir = path.dirname(configFile)
const docsRoot = path.resolve(vitepressDir, '..')

const isMarkdownFile = (name: string) => name.toLowerCase().endsWith('.md')
const joinPosix = (...parts: string[]) => parts.filter(Boolean).join('/')
const sortByName = (a: string, b: string) => a.localeCompare(b, 'zh-Hant')

const toLink = (relativeFilePath: string): string => {
  const normalized = relativeFilePath.replace(/\\/g, '/')
  if (normalized === 'index.md') return '/'
  if (normalized.endsWith('/index.md')) {
    return `/${encodeURI(normalized.slice(0, -'index.md'.length))}`
  }
  return `/${encodeURI(normalized.replace(/\.md$/i, ''))}`
}

const buildSidebarItems = (relativeDir = ''): DefaultTheme.SidebarItem[] => {
  const absoluteDir = path.join(docsRoot, relativeDir)
  const entries = fs
    .readdirSync(absoluteDir, { withFileTypes: true })
    .filter((entry) => !entry.name.startsWith('.') && entry.name !== '.vitepress')

  const directories = entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort(sortByName)

  const markdownFiles = entries
    .filter((entry) => entry.isFile() && isMarkdownFile(entry.name))
    .map((entry) => entry.name)
    .sort(sortByName)

  const directoryItems = directories
    .map((directoryName): DefaultTheme.SidebarItem | null => {
      const childRelativeDir = joinPosix(relativeDir, directoryName)
      const childAbsoluteDir = path.join(absoluteDir, directoryName)
      const childItems = buildSidebarItems(childRelativeDir)
      const hasOverview = fs.existsSync(path.join(childAbsoluteDir, 'overview.md'))
      const hasIndex = fs.existsSync(path.join(childAbsoluteDir, 'index.md'))
      const link = hasOverview
        ? toLink(joinPosix(childRelativeDir, 'overview.md'))
        : hasIndex
          ? toLink(joinPosix(childRelativeDir, 'index.md'))
          : undefined

      if (childItems.length === 0) {
        if (!link) return null
        return {
          text: directoryName,
          link
        }
      }

      const group: DefaultTheme.SidebarItem = {
        text: directoryName,
        items: childItems
      }

      if (link) {
        group.link = link
      }

      return group
    })
    .filter((item): item is DefaultTheme.SidebarItem => item !== null)

  const fileItems = markdownFiles
    .filter((fileName) => {
      if (fileName === 'index.md') return false
      if (relativeDir && (fileName === 'overview.md' || fileName === 'index.md')) return false
      return true
    })
    .map((fileName) => {
      const relativeFilePath = joinPosix(relativeDir, fileName)
      return {
        text: fileName.replace(/\.md$/i, ''),
        link: toLink(relativeFilePath)
      }
    })

  return [...directoryItems, ...fileItems]
}

// https://vitepress.vuejs.org/config/app-configs
export default defineConfig({
  base: process.env.BASE_PATH || '/',
  themeConfig: {
    sidebar: [
      {
        text: '目錄',
        items: buildSidebarItems(),
        collapsible: true
      }
    ]
  }
})
