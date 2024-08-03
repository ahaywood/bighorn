import { Readable } from 'node:stream'

import { SitemapStream, streamToPromise } from 'sitemap'

import type {
  MiddlewareRequest,
  MiddlewareResponse,
} from '@redwoodjs/web/middleware'

import { getPosts } from 'src/content/posts'

export async function middleware(
  req: MiddlewareRequest,
  mwResponse: MiddlewareResponse
) {
  const url = new URL(req.url)
  if (url.pathname !== '/sitemap.xml') {
    return mwResponse
  }
  console.log('Sitemap request is being handled by middleware')

  const ROOT_URL = process.env.DEPLOY_URL

  // We know a selection of static links we can hardcode
  const links = [
    { url: ROOT_URL, changefreq: 'weekly', priority: 0.5 },
    { url: ROOT_URL + '/blog', changefreq: 'weekly', priority: 0.7 },
    { url: ROOT_URL + '/brand', changefreq: 'weekly', priority: 0.5 },
  ]

  // Include the dynamic links to blog posts
  const posts = getPosts()
  for (const post of posts) {
    const url = ROOT_URL + '/blog/' + post.slug
    links.push({
      url,
      changefreq: 'weekly',
      priority: 0.7,
    })
  }

  const sitemapStream = new SitemapStream({ hostname: ROOT_URL })
  const sitemapXml = await streamToPromise(
    Readable.from(links).pipe(sitemapStream)
  ).then((data) => data.toString())

  mwResponse.headers.set('Content-Type', 'application/xml')
  mwResponse.body = sitemapXml

  return mwResponse
}
