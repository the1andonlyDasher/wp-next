const API_URL: any = process.env.WORDPRESS_API_URL;

async function fetchAPI(query = "", { variables }: Record<string, any> = {}) {
  const headers: any = { "Content-Type": "application/json" };

  if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
    headers[
      "Authorization"
    ] = `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`;
  }

  // WPGraphQL Plugin must be enabled
  const res = await fetch(API_URL, {
    headers,
    method: "POST",
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error("Failed to fetch API");
  }
  return json.data;
}

export async function getPreviewPost(id: any, idType = "DATABASE_ID") {
  const data = await fetchAPI(
    `
    query PreviewPost($id: ID!, $idType: PostIdType!) {
      post(id: $id, idType: $idType) {
        databaseId
        slug
        status
      }
    }`,
    {
      variables: { id, idType },
    }
  );
  return data.post;
}

export async function getAllPostsWithSlug() {
  const data = await fetchAPI(`
    {
      posts(first: 10000) {
        edges {
          node {
            slug
          }
        }
      }
    }
  `);
  return data?.posts;
}

export async function getAllPostsForHome(preview: any) {
  const data = await fetchAPI(
    `
    query AllPosts {
      posts(first: 20, where: { orderby: { field: DATE, order: DESC } }) {
        edges {
          node {
            slug
            date
            custompost{
              title
              text
              image{
                node{
                  sourceUrl
                }
              }
              carousel{
                image{
                  node{
                    sourceUrl
                  }
                }
                        image2{
                  node{
                    sourceUrl
                  }
                }
  
              }
            }
            featuredImage {
              node {
                sourceUrl
              }
            }
            author {
              node {
                name
                firstName
                lastName
                avatar {
                  url
                }
              }
            }
          }
        }
      }
    }
  `,
    {
      variables: {
        onlyEnabled: !preview,
        preview,
      },
    }
  );

  return data?.posts;
}

export async function getPostAndMorePosts(
  slug: any,
  preview: any,
  previewData: any
) {
  const postPreview = preview && previewData?.post;
  // The slug may be the id of an unpublished post
  const isId = Number.isInteger(Number(slug));
  const isSamePost = isId
    ? Number(slug) === postPreview.id
    : slug === postPreview.slug;
  const isDraft = isSamePost && postPreview?.status === "draft";
  const isRevision = isSamePost && postPreview?.status === "publish";
  const data = await fetchAPI(
    `
    fragment AuthorFields on User {
      name
      firstName
      lastName
      avatar {
        url
      }
    }
    fragment PostFields on Post {
      custompost{
        title
        text
        image{
          node{
            sourceUrl
          }
        }
        carousel{
          image{
            node{
              mediaDetails {
                width
                height
              }
              sourceUrl
            }
          }
                  image2{
            node{
              mediaDetails {
                width
                height
              }
              sourceUrl
            }
          }
          image3{
            node{
              mediaDetails {
                width
                height
              }
              sourceUrl
            }
          }
          image4{
            node{
              mediaDetails {
                width
                height
              }
              sourceUrl
            }
          }
        }
      }
      slug
      date
      featuredImage {
        node {
          sourceUrl
        }
      }
      author {
        node {
          ...AuthorFields
        }
      }
      categories {
        edges {
          node {
            name
          }
        }
      }
      tags {
        edges {
          node {
            name
          }
        }
      }
    }
    query PostBySlug($id: ID!, $idType: PostIdType!) {
      post(id: $id, idType: $idType) {
        ...PostFields
        content
        ${
          // Only some of the fields of a revision are considered as there are some inconsistencies
          isRevision
            ? `
        revisions(first: 1, where: { orderby: { field: MODIFIED, order: DESC } }) {
          edges {
            node {
              custompost{
                title
                text
                image{
                  node{
                    mediaDetails {
                      width
                      height
                    }
                    sourceUrl
                  }
                }
                carousel{
                  image{
                    node{
                      mediaDetails {
                        width
                        height
                      }
                      sourceUrl
                    }
                  }
                          image2{
                    node{
                      mediaDetails {
                        width
                        height
                      }
                      sourceUrl
                    }
                  }
                  image3{
                    node{
                      mediaDetails {
                        width
                        height
                      }
                      sourceUrl
                    }
                  }
                }
                image4{
                  node{
                    mediaDetails {
                      width
                      height
                    }
                    sourceUrl
                  }
                }
              }
              content
              author {
                node {
                  ...AuthorFields
                }
              }
            }
          }
        }
        `
            : ""
        }
      }
      posts(first: 3, where: { orderby: { field: DATE, order: DESC } }) {
        edges {
          node {
            ...PostFields
          }
        }
      }
    }
  `,
    {
      variables: {
        id: isDraft ? postPreview.id : slug,
        idType: isDraft ? "DATABASE_ID" : "SLUG",
      },
    }
  );

  // Draft posts may not have an slug
  if (isDraft) data.post.slug = postPreview.id;
  // Apply a revision (changes in a published post)
  if (isRevision && data.post.revisions) {
    const revision = data.post.revisions.edges[0]?.node;

    if (revision) Object.assign(data.post, revision);
    delete data.post.revisions;
  }

  // Filter out the main post
  data.posts.edges = data.posts.edges.filter(
    ({ node }: any) => node.slug !== slug
  );
  // If there are still 3 posts, remove the last one
  if (data.posts.edges.length > 2) data.posts.edges.pop();

  return data;
}

export async function getPageBySlug(slug: any) {
  const data = await fetchAPI(`
  {
    page(id: "${slug}", idType: URI) {
      title
      slug
    acfDemoFields{
      header
      text
      image{
        node{
          sourceUrl
        }
      }
    }
    }
  }
  `);
  return data;
}

export async function getAllPagesWithSlugs() {
  const data = await fetchAPI(`
  {
    pages(first:1000) {
      edges {
        node {
          slug
        }
      }
    }
  }
  `);
  return data?.pages;
}

export async function sendMail(
  subject: any,
  body: any,
  mutationId = "contactForm"
) {
  const fromAddress = "noreply@yourwebsite.com";
  const toAddress = "someone@yourwebsite.com";
  const data = await fetchAPI(
    `
		mutation SendEmail($input: SendEmailInput!) {
			sendEmail(input: $input) {
				message
				origin
				sent
			}
		}
	`,
    {
      variables: {
        input: {
          clientMutationId: mutationId,
          from: fromAddress,
          to: toAddress,
          body: body,
          subject: subject,
        },
      },
    }
  );

  return data?.sendEmail;
}

`posts{
  nodes{
    slug
    custompost{
      title
      text
      image{
        node{
          sourceUrl
        }
      }
      carousel{
        image{
          node{
            sourceUrl
          }
        }
                image2{
          node{
            sourceUrl
          }
        }
      }
    }
  }
}`;
