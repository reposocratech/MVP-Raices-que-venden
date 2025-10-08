import mailChimpDal from './mailChimp.dal.js';

class MailChimpController {
  subscribe = async (req, res) => {
    try {
      const {name, email} = req.body;
      
      /* const result = await mailChimpDal.subscribe({name, email}); */
      /* res.status(200).json(result); */
      res.status(200).json({message: 'de momento nada'})

    } catch (error) {
      console.log(error);
      res.status(500).json({message: "error **************", error})
    }
  }
}

export default new MailChimpController();