const buildMockRouter = () => {
  const router = {
    getRoutes: {},
    postRoutes: {},
    get: (url, handler) => {
      router.getRoutes[url] = handler
    },
    put: (url, handler) => {
      router.putRoutes[url] = handler
    },
    post: (url, handler) => {
      router.postRoutes[url] = handler
    },
  }
  return router
}

module.exports = buildMockRouter
