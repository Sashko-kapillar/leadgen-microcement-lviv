import { useEffect } from 'react'

const BASE_URL = 'https://leadgen-microcement-lviv.vercel.app'
const SITE_NAME = 'Мікроцемент Львів'
const DEFAULT_IMAGE = `${BASE_URL}/og-image.jpg`

type SEOProps = {
  title?: string
  description: string
  path?: string
  image?: string
}

function setMetaTag(attribute: 'name' | 'property', key: string, value: string) {
  let element = document.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`)

  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }

  element.setAttribute('content', value)
}

function setCanonical(url: string) {
  let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')

  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', 'canonical')
    document.head.appendChild(link)
  }

  link.setAttribute('href', url)
}

export default function SEO({ title, description, path = '/', image = DEFAULT_IMAGE }: SEOProps) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME
  const fullUrl = `${BASE_URL}${path}`

  useEffect(() => {
    document.title = fullTitle

    setMetaTag('name', 'description', description)
    setMetaTag('name', 'robots', 'index, follow')

    setCanonical(fullUrl)

    setMetaTag('property', 'og:type', 'website')
    setMetaTag('property', 'og:site_name', SITE_NAME)
    setMetaTag('property', 'og:title', fullTitle)
    setMetaTag('property', 'og:description', description)
    setMetaTag('property', 'og:url', fullUrl)
    setMetaTag('property', 'og:image', image)

    setMetaTag('name', 'twitter:card', 'summary_large_image')
    setMetaTag('name', 'twitter:title', fullTitle)
    setMetaTag('name', 'twitter:description', description)
    setMetaTag('name', 'twitter:image', image)
  }, [fullTitle, description, fullUrl, image])

  return null
}
