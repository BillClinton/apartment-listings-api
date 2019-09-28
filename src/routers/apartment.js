/**
 * Express router providing user related routes
 */
const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth');
const Apartment = require('../models/apartment');

module.exports = router;

/**
 * @api {post} /apartments Create Apartment
 * @apiName CreateApartment
 * @apiGroup Apartment
 *
 * @apiParam {JSON} body Apartment object.
 * @apiParamExample {json} Request-Example:
 *     {
 * 	    "name":"3 bedroom in Fairmount",
 * 	    "address": "2009 Green St., Philadelphia Pa, 19130",
 * 	    "rent": 1850,
 * 	    "bedrooms": 3,
 * 	    "bathrooms": 1.5,
 * 	    "contact": "215-123-4567",
 * 	    "available": "December"
 *     }
 *
 * @apiSuccess {Object} user User profile information
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 * 	     "name":"3 bedroom in Fairmount",
 * 	     "address": "2009 Green St., Philadelphia Pa, 19130",
 * 	     "rent": 1850,
 * 	     "bedrooms": 3,
 * 	     "bathrooms": 1.5,
 * 	     "contact": "215-123-4567",
 * 	     "available": "December"
 *     }
 *
 * @apiError (Error 4xx) 400 Bad Request
 */
router.post('/apartments', auth, async (req, res) => {
  const apartment = new Apartment(req.body);

  try {
    await apartment.save();

    res.status(201).send({ apartment });
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

/**
 * @api {get} /apartments Read All Apartments
 * @apiName GetApartments
 * @apiGroup Apartment
 *
 * @apiSuccess {Object[]} apartments An Array of apartment objects
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [{
 *      "_id": "5d8c2b339740dd02df0ed8c0",
 *      "name":"3 bedroom in Fairmount",
 *      "address": "2009 Green St., Philadelphia Pa, 19130",
 *      "rent": 1850,
 *      "bedrooms": 3,
 *      "bathrooms": 1.5,
 *      "contact": "215-123-4567",
 *      "available": "December",
 *      "createdAt": "2019-09-26T03:06:27.712Z",
 *      "updatedAt": "2019-09-26T03:06:27.712Z",
 *      "__v": 0
 *     },{
 *      "_id": "5d8fcfac47867a038e8f87fe",
 *      "name":"Large Rehabbed 3 Bedroom House in Northern Liberties",
 *      "address": "944 N American St, Philadelphia Pa, 19130",
 *      "rent": 2350,
 *      "bedrooms": 3,
 *      "bathrooms": 2,
 *      "contact": "267-123-4567",
 *      "available": "November 15",
 *      "createdAt": "2019-09-28T21:25:00.695Z",
 *      "updatedAt": "2019-09-28T21:25:00.695Z",
 *      "__v": 0
 *     }]
 *
 * @apiError (Error 5xx) 500 Internal Server Error
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Error Message"
 *     }
 */
router.get('/apartments', auth, async (req, res) => {
  try {
    const apartments = await Apartment.find({});
    res.send(apartments);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

/**
 * @api {get} /apartment/:id Read Apartment
 * @apiName ReadApartment
 * @apiGroup Apartment
 *
 * @apiParam {String} id Apartment's unique ID.
 *
 * @apiSuccess {Object} apartment Apartment information
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "_id": "5d8fcfac47867a038e8f87fe",
 *        "name":"Large Rehabbed 3 Bedroom House in Northern Liberties",
 *        "address": "944 N American St, Philadelphia Pa, 19130",
 *        "rent": 2350,
 *        "bedrooms": 3,
 *        "bathrooms": 2,
 *        "contact": "267-123-4567",
 *        "available": "November 15",
 *        "createdAt": "2019-09-28T21:25:00.695Z",
 *        "updatedAt": "2019-09-28T21:25:00.695Z",
 *        "__v": 0
 *     }
 *
 * @apiError (Error 4xx) 404 Not Found
 *
 * @apiError (Error 5xx) 500 Internal Server Error
 *
 */
router.get('/apartments/:id', auth, async (req, res) => {
  try {
    const apartment = await Apartment.findById(req.params.id);

    if (!apartment) {
      res.status(404).send();
    }
    res.send(apartment);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});
