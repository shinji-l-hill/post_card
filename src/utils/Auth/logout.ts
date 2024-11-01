export const logout = () => {
  localStorage.removeItem('jwtToken');
  localStorage.removeItem('userId');
  return true;
}