export const db = [{
  slug: 'article-1',
  title: 'Article 1 (idk)',
  message: 'Thats a cool article this one'
}, {
  slug: 'article-2',
  title: 'Article 2 (idkv2)',
  message: 'This one also is a cool one'
}, {
  slug: 'article-3',
  title: 'Article 3 (idkv3)',
  message: 'Nah not this one, isnt as good as the last one'
}]

export default function handler(req, res) {
  res.status(200).json(db)
}
