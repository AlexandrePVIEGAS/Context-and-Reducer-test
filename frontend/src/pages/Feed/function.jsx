export async function getAllPosts(setDataPosts, setDisplayPosts) {
  try {
    const resultApi = await fetch("http://localhost:3000/api/post", {
      method: "GET",
      credentials: "include",
    });
    const data = await resultApi.json();
    setDataPosts(data.posts);
    setDisplayPosts(true);
  } catch (error) {
    console.log(error);
  }
}

export async function createPost(dataPost, setDataPosts, dataPosts) {
  try {
    const resultApi = await fetch("http://localhost:3000/api/post", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataPost),
    });
    const data = await resultApi.json();
    setDataPosts([...dataPosts, data.post]);
  } catch (error) {
    console.log(error);
  }
}

export async function likePost(dataPosts, id, setDataPosts) {
  try {
    const resultApi = await fetch("http://localhost:3000/api/post/" + dataPosts[0].id + "/like", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: id,
        post_id: dataPosts[0].id,
      }),
    });
    const data = await resultApi.json();
    setDataPosts(data.posts);
  } catch (error) {
    console.log(error);
  }
}