export default function handler(req, res) {

  
    const userProfile = {
      username: 'Ikram', 
      email: 'ikram.amine@edu.ece.fr' 
    };
  
    res.status(200).json(userProfile);
  }
  