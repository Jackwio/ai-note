import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig, type DefaultTheme } from 'vitepress'

const configFile = fileURLToPath(import.meta.url)
const vitepressDir = path.dirname(configFile)
const docsRoot = path.resolve(vitepressDir, '..')
const expandedTopLevelDirs = new Set<string>()

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
    .map((directoryName): DefaultTheme.SidebarItem => {
      const childRelativeDir = joinPosix(relativeDir, directoryName)
      const childItems = buildSidebarItems(childRelativeDir)

      const group: DefaultTheme.SidebarItem = {
        text: directoryName,
        items: childItems
      }

      return group
    })

  const fileItems = markdownFiles
    .filter((fileName) => {
      if (relativeDir === '' && fileName === 'index.md') return false
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

const buildRootSidebar = (): DefaultTheme.SidebarGroup[] => {
  const rootEntries = fs
    .readdirSync(docsRoot, { withFileTypes: true })
    .filter((entry) => !entry.name.startsWith('.') && entry.name !== '.vitepress')

  const topLevelDirs = rootEntries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort(sortByName)

  const rootMarkdownFiles = rootEntries
    .filter((entry) => entry.isFile() && isMarkdownFile(entry.name))
    .map((entry) => entry.name)
    .sort(sortByName)
    .filter((fileName) => fileName !== 'index.md')
    .map((fileName) => ({
      text: fileName.replace(/\.md$/i, ''),
      link: toLink(fileName)
    }))

  const groups: DefaultTheme.SidebarGroup[] = topLevelDirs.map((directoryName) => ({
    text: directoryName,
    items: buildSidebarItems(directoryName),
    collapsible: true,
    collapsed: !expandedTopLevelDirs.has(directoryName)
  }))

  if (rootMarkdownFiles.length > 0) {
    groups.unshift({
      text: '根目錄',
      items: rootMarkdownFiles,
      collapsible: true,
      collapsed: false
    })
  }

  return groups
}

// https://vitepress.vuejs.org/config/app-configs
export default defineConfig({
  title: 'AI Note',
  description: 'AI Note',
  base: process.env.BASE_PATH || '/',
  themeConfig: {
    siteTitle: 'AI Note',
    sidebar: buildRootSidebar()
  },
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ]
})
