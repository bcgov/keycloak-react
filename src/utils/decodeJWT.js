/**
 * Decodes a JSON Web Token (JWT) and returns the payload object.
 * @author Zach Bourque
 * @param {string} jwt - The JWT string to be decoded.
 * @returns {Object} - The decoded payload object.
 */
const decodeJWT = (jwt) => {
  const base64Url = jwt.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join(''),
  );

  return JSON.parse(jsonPayload);
};

export default decodeJWT;
