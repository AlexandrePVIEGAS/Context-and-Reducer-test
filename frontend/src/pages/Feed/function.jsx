export async function getAllPosts(setDataPosts, setDisplayPosts) {
  try {
    const resultApi = await fetch("http://localhost:3000/api/post", {
      method: "GET",
      credentials: "include",
    });
    const data = await resultApi.json();
    if (!data.error) {
      setDataPosts(data.posts);
      setDisplayPosts(true);
    } else {
      setDisplayPosts(false);
    }
  } catch (error) {
    console.log(error);
  }
}

export async function createPost(dataPost, setDataPosts, setDisplayPosts, setDataPost) {
  try {
    await fetch("http://localhost:3000/api/post", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataPost),
    });
    getAllPosts(setDataPosts, setDisplayPosts);
  } catch (error) {
    console.log(error);
  }
}

export async function likePost(dataPosts, userId, setDataPosts, setDisplayPosts, idPost) {
  const index = dataPosts.findIndex((post) => post.id === idPost);
  if (index !== -1) {
    try {
      await fetch("http://localhost:3000/api/post/" + dataPosts[index].id + "/like", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          post_id: dataPosts[index].id,
        }),
      });
      getAllPosts(setDataPosts, setDisplayPosts);
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log("ID du post non trouvé");
  }
}

export async function deletePost(dataPosts, setDataPosts, setDisplayPosts, idPost) {
  const index = dataPosts.findIndex((post) => post.id === idPost);
  try {
    await fetch("http://localhost:3000/api/post/" + dataPosts[index].id, {
      method: "DELETE",
      credentials: "include",
    });
    getAllPosts(setDataPosts, setDisplayPosts);
  } catch (error) {
    console.log(error);
  }
}
