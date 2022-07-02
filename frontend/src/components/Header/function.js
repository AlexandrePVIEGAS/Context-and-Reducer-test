/**
 * Disconnect the user
 */
async function disconnect() {
  try {
    await fetch("http://localhost:3000/api/auth/logout", {
      method: "DELETE",
      credentials: "include",
    });
    window.location.href = "/";
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  disconnect,
};
