import { groq } from 'next-sanity'

export const heroQuery = groq`*[_type == "hero"][0]{
  headline,
  subheadline,
  "backgroundMediaUrl": backgroundMedia.asset->url
}`

export const servicesQuery = groq`*[_type == "service"]{
  _id,
  title,
  description,
  icon,
  "hoverImageUrl": hoverImage.asset->url
}`

export const machineryQuery = groq`*[_type == "machinery"]{
  _id,
  pressName,
  capacity,
  technicalSpecs,
  "placeholderImageUrl": placeholderImage.asset->url
}`

export const featuredProductsQuery = groq`*[_type == "product" && featured == true]{
  _id,
  title,
  shortDescription,
  "imageUrl": image.asset->url,
  accentColor
}`

export const allProductsQuery = groq`*[_type == "product"]{
  _id,
  title,
  shortDescription,
  "imageUrl": image.asset->url,
  accentColor
}`
