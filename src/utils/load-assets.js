function loadAssets(str) {
  // console.log('资源 ===> ', new URL(`/src/${str}`, import.meta.url).href)
  return new URL(`/src/${str}`, import.meta.url).href
}

export { loadAssets }
