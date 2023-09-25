import db from "../config/db";

export const createPost = async (post: any) => {
  try {
    const results = await db
      .promise()
      .query(
        `INSERT INTO publicaciones (contenido, id_usuario ) VALUES ('${post.contenido}', 20)`
      );

    return results;
  } catch (error) {
    console.log(error);
  }
};
