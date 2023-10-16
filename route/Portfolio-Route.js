const express = require("express");
const router = express.Router();

const PortFolio = require("../Model/Portfolio-Model");


const app = express();
app.use(express.json());


router.post("/",async (req,res)=>{
try{
     const portfolio  =  new PortFolio({
        Name    : req.body.Name,
        Email   : req.body.Email,
        Number  : req.body.Number,
        Text    : req.body.Text,
        Message : req.body.Message,  
    })

   const PortFolioregistered = await portfolio.save();

   // res.status(201).render("index");
// Render the "index" page and pass the JSON message as data
  // res.status(201).render("index", { jsonData: JSON.stringify({ success: true, message: 'Thanks for your response', data: PortFolioregistered }) });
  res.status(201).json({ success: true, message: 'Thanks Your Data has been successfully sent' }); 
}catch (error) {
    res.status(400).send(error);
    }
    });

router.get("/Dashboard", async (req, res) => {
      try {
        const portfolioItems = await PortFolio.find({});
        res.render("Dashboard", {
          title: "Portfolio Records",
          records: portfolioItems,
        });
      } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching portfolio data.");
      }
  });

    router.post("/Dashboard", async function (req, res, next) {
      try {
        const empDetails = new PortFolio({
          Name    : req.body.Name,
          Email   : req.body.Email,
          Number  : req.body.Number,
          Text    : req.body.Text,
          Message : req.body.Message,  
        });
    
        await empDetails.save();
        res.redirect("Dashboard");
      } catch (err) {
        console.error(err);
        res.status(500).send("Error saving employee details.");
      }
    });    

    router.get("/delete/:id", function (req, res, next) {
      const _id = req.params.id;
      const del = PortFolio.findByIdAndDelete(_id);
      del.then((data) => {
        // Redirect back to the Dashboard page after deleting the portfolio record
        res.redirect("/Dashboard");
      }).catch((err) => {
        console.error(err);
        return res.status(500).send("Error deleting portfolio record.");
      });
    });
    
    router.get("/edit/:id", function (req, res, next) {
      const _id = req.params.id;
      const edit = PortFolio.findById(_id);
      edit.then((data) => {
          // Render the "edit.hbs" template and pass the necessary data
          res.render("Dashboardedit", {
              title: "Edit Employee Records",
              records: data,
          });
      }).catch((err) => {
          console.error(err);
          return res.status(500).send("Error fetching employee record.");
      });
    });
  

/*
router.post("/update/", async function (req, res, next) {
      try {
        await PortFolio.findByIdAndUpdate(
          req.body._id,
          {
            Name    : req.body.Name,
            Email   : req.body.Email,
            Number  : req.body.Number,
            Text    : req.body.Text,
            Message : req.body.Message,  
          }
        );
        res.redirect("Dashboard");
      } catch (err) {
        console.error(err);
        return res.status(500).send("Error updating employee record.");
      }
    });
*/

router.post("/update", async (req, res) => {
  try {
    const _id = req.body._id;
    const updatedData = {
      Name: req.body.Name,
      Email: req.body.Email,
      Number: req.body.Number,
      Text: req.body.Text,
      Message: req.body.Message,
    };

    // Use findByIdAndUpdate to update the existing record
    await PortFolio.findByIdAndUpdate(_id, updatedData);

    // Redirect back to the Dashboard page after editing
    res.redirect("/Dashboard");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating portfolio record.");
  }
});

module.exports = router;
