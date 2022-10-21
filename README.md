# Wardrobify

Team:

* Karis - Shoes
* Angel - Hats

## Design

## Shoes microservice

Explain your models and integration with the wardrobe
microservice, here.

Models
Shoe
BinVO

Back-End
API-leveraging views utilize RESTful routes to permit adding, deleting, updating, and viewing - either individually or as a list - instances of Shoe, which has a BinVO property, deriving from the Postgres db.
The BinVO instances are updated or created each time the Wardrobe microservice is polled per poller.py, which results in a one-to-one relationship of BinVO instances and Bin (of the Wardrobe microservice) instances.

Front-End
RESTful routes are referenced in React components, permitting adding, deleting, and viewing - either individually or as a list -  instances of Shoe via the UI.


## Hats microservice

Explain your models and integration with the wardrobe
microservice, here.
