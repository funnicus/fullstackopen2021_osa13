require('dotenv').config()
const { Sequelize, Model, DataTypes, QueryTypes } = require('sequelize')
const express = require('express')
const app = express()

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
})

app.use(express.json())

class Blog extends Model {}

Blog.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  author: {
    type: DataTypes.TEXT,
  },
  url: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  likes: {
    type: DataTypes.INTEGER,
    default: 0
  }
}, {  
  sequelize,  
  underscored: true,  
  timestamps: false,  
  modelName: 'blog'
})

// Create Blog table if it doen't exist!
Blog.sync()

app.get('/api/blogs', async (req, res) => { 
  try {
    const blogs = await Blog.findAll(); 
    res.json(blogs)
  } catch (error) {
    return res.status(400).json({ error })
  } 
})

app.post('/api/blogs/', async (req, res) => {
  try {
    console.log(req.body)
    const blog = Blog.create(req.body)
    res.json(blog)
  } catch (error) {
    return res.status(400).json({ error })
  }
})

app.delete('/api/blogs/:id', async (req, res) => {
  try {
    await Blog.destroy({ where: { id: req.params.id }})
    res.status(204).end()
  } catch (error) {
    return res.status(400).json({ error })
  }
})

app.get('/api/blogs/:id', async (req, res) => {
  const blog = await Blog.findByPk(req.params.id)
  if (blog) {
    res.json(blog)
  } else {
    res.status(404).end()
  }
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {  
  console.log(`Server running on port ${PORT}`)
})