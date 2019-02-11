class GeoFire {

  constructor(collectionRef) {
    this.collectionRef = collectionRef;
  }

  getDocumentReference(documentID) {
    return this.collectionRef.document(documentID);
  }

  setLocation(documentId, latitude, longitude) {
    let docRef = this.getDocumentReference(documentId);
    let degreeMatch = (latitude+90)*180+longitude;

    return docRef.update({
      geoFireLocation: degreeMatch
    })
    .then(function() {
      console.log("Document successfully updated!");
    })
    .catch(function(error) {
      console.error("Error updating document: ", error);
    });
  }

  query() {
    return new GeoFireQuery().onCollection(this.collectionRef);
  }
}
