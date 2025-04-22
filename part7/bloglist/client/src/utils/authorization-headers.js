export const getDefaultHeaders = () => {
  const token = JSON.parse(window.localStorage.getItem('loggedBlogAppUser')).token

  return {
    headers: { Authorization: `Bearer ${token}` },
  }
}