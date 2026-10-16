
const cl = console.log;

let posts = [
    {
        "userId": 1,
        "id": 1,
        "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
    },
    {
        "userId": 2,
        "id": 2,
        "title": "qui est esse",
        "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
    },
    {
        "userId": 3,
        "id": 3,
        "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
        "body": "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
    },
    {
        "userId": 4,
        "id": 4,
        "title": "eum et est occaecati",
        "body": "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit"
    },
    {
        "userId": 5,
        "id": 5,
        "title": "nesciunt quas odio",
        "body": "repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque"
    },
    {
        "userId": 6,
        "id": 6,
        "title": "dolorem eum magni eos aperiam quia",
        "body": "ut aspernatur corporis harum nihil quis provident sequi\nmollitia nobis aliquid molestiae\nperspiciatis et ea nemo ab reprehenderit accusantium quas\nvoluptate dolores velit et doloremque molestiae"
    },
    {
        "userId": 7,
        "id": 7,
        "title": "magnam facilis autem",
        "body": "dolore placeat quibusdam ea quo vitae\nmagni quis enim qui quis quo nemo aut saepe\nquidem repellat excepturi ut quia\nsunt ut sequi eos ea sed quas"
    },
    {
        "userId": 8,
        "id": 8,
        "title": "dolorem dolore est ipsam",
        "body": "dignissimos aperiam dolorem qui eum\nfacilis quibusdam animi sint suscipit qui sint possimus cum\nquaerat magni maiores excepturi\nipsam ut commodi dolor voluptatum modi aut vitae"
    },
    {
        "userId": 9,
        "id": 9,
        "title": "nesciunt iure omnis dolorem tempora et accusantium",
        "body": "consectetur animi nesciunt iure dolore\nenim quia ad\nveniam autem ut quam aut nobis\net est aut quod aut provident voluptas autem voluptas"
    },
    {
        "userId": 10,
        "id": 10,
        "title": "optio molestias id quia eum",
        "body": "quo et expedita modi cum officia vel magni\ndoloribus qui repudiandae\nvero nisi sit\nquos veniam quod sed accusamus veritatis error"
    },
    {
        "userId": 11,
        "id": 11,
        "title": "et ea vero quia laudantium autem",
        "body": "delectus reiciendis molestiae occaecati non minima eveniet qui voluptatibus\naccusamus in eum beatae sit\nvel qui neque voluptates ut commodi qui incidunt\nut animi commodi"
    }
]


const port = 3000;

const express = require("express");

const app = express();

app.use(express.json())

app.get("/api/posts", (req, res) => {

    try {

        res.status(200).json({
            success: true,
            body: posts,
            message: "post fetch successfully"
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "something went wrong",
            error: err.message
        })
    }
})



//get api fetch to single post

app.get("/api/posts/:id", (req,res)=>{
    try{
        const id = Number(req.params.id);
        const singlePosts = posts.find(p => p.id === id)
        if(!singlePosts){
            return res.status(404).json({
                success : false,
                message : "single post data not found!!!"
            })
        }
        res.status(200).json({
            success : true,
            body : singlePosts,
            message : "single posts data fetched successfully !!!"
        })
    }catch(err){
        res.status(500).json({
            success : false,
            message :"something went wrong !!!",
            error : err.message
        })
    }
})

//create api
app.post("/api/posts", (req, res) => {
  try {
    let newPost = {
      id: Date.now().toString(),
      userId: req.body.userId,
      title: req.body.title,
      body: req.body.body,
    }

    posts.push(newPost)

    res.status(201).json({
      success: true,
      body: newPost,
      message: "Post created successfully !!!"
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: " Something went wrong !!!!",
      error: err.message
    })
  }
})

// update api
app.patch("/api/posts/:id", (req, res) =>{
  try{
    let updatepost = posts.find(post => post.id == req.params.id);

    if(!updatepost){
      return res.status(404).json({
        success: false,
        message: "Post not found !!!!"
      })
    }

    updatepost.userId = req.body.userId;
    updatepost.title = req.body.title;
    updatepost.body = req.body.body;

    res.status(200).json({
      success: true,
      body: updatepost,
      message: "Post  fetched updated successfully !!!!",
    })
  }catch(err){
    res.status(500).json({
      success: false,
      message: "Something went wrong !!!!",
      error: err.message
    })
  }
})

// delete api
app.delete("/api/posts/:id", (req, res)=>{
  try{
    let getIndex = posts.findIndex(post => post.id == req.params.id);

    if(getIndex === -1){
      return res.status(404).json({
        success: false,
        message: "Post not found !!!!"
      })
    }
    let deletedPost = posts.splice(getIndex, 1);

    res.status(200).json({
      success: true,
      body: deletedPost[0],
      message: "Post  fetched deleted successfully !!!!",
    })
  }catch(err){
    res.status(500).json({
      success: false,
      message: "Something went wrong !!!!",
      error: err.message
    })
  }
})

app.listen(port,() =>{
    cl("posts data  fetched  successfully !!!!")
})