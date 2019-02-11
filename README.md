Current Production: **NA**<br>
Current Pre-Production: **NA**<br>

_GeoFire-Web_ adds location based searching capability to the popular Google Firebase Firestore platform. This is a web port of the Android Library.

In its current state, this is very much an experimental library.

## Usage
You'll need to set up GeoFire to use your collection:

```
let db = firebase.firestore();
let collectionRef = db.getCollection("myCollection");
let geoFire = new GeoFire(collectionRef);
```

When saving your documents, in the onComplete listener you'll need to get GeoFire to update the document with its calculated location (you obviously need to replace the document with whatever object you're working with):

```
geoFire.setLocation(document.id, document.latitude, document.longitude);
```

You can then use GeoFire as shown below. The line .whereNearTo is the important bit, but you can use any
other standard Firestore query language as normal:

```
let queryLocation = new QueryLocation().fromDegrees(1.0, 1.0);
let distance = new Distance(1.0, DistanceUnit().KILOMETERS);

geoFire.query()
      .whereEqualTo("title", "The Title")
      .whereNearTo(queryLocation, distance)
      .orderBy("timestamp", "descending")
      .limit(10)
      .build()
      .get()
      .then(function(doc) {
          if (doc.exists) {
              Log.i("DB", "Got Documents.");
          } else {
              Log.w("DB", "Error getting documents.", task.getException());
          }
      }).catch(function(error) {
          console.log("Error getting document: ", error);
      });
```
