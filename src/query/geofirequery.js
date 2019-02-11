class GeoFireQuery {

  onCollection(collectionReference) {
    this.query = collectionReference;
  }

  whereArrayContains(field, value) {
    this.query = this.query.where(field, "array-contains", value);
    return this;
  }

  whereEqualTo(field, value) {
    this.query = this.query.where(field, "==", value);
    return this;
  }

  whereGreaterThan(field, value) {
    this.query = this.query.where(field, ">", value);
    return this;
  }


  whereGreaterThanOrEqualTo(field, value) {
    this.query = this.query.where(field, ">=", value);
    return this;
  }

  whereLessThan(field, value) {
    this.query = this.query.where(field, "<", value);
    return this;
  }

  whereLessThanOrEqualTo(field, value) {
    this.query = this.query.where(field, "<=", value);
    return this;
  }

  orderBy(field) {
    this.query = this.query.orderBy(field);
    return this;
  }

  orderBy(field, direction) {
    this.query = this.query.orderBy(field, direction);
    return this;
  }

  limit(limit) {
    this.query = this.query.limit(limit);
    return this;
  }

  endAt(endAt) {
    this.query = this.query.endAt(endAt);
    return this;
  }

  startAt(startAt) {
    this.query = this.query.startAt(startAt);
    return this;
  }

  endBefore(endBefore) {
    this.query = this.query.endBefore(endBefore);
    return this;
  }

  startAfter(startAfter) {
    this.query = this.query.startAfter(startAfter);
    return this;
  }

  whereNearTo(queryLocation, distance) {
    let geoPointUtils = new BoundingBoxUtils(distance.getUnit());
    let boundingBox = geoPointUtils.getBoundingBox(queryLocation, distance.getDistance());
    this.query = this.query
        .orderBy("geoFireLocation")
        .whereGreaterThanOrEqualTo("geoFireLocation", boundingBox.getMinimumMatch())
        .whereLessThanOrEqualTo("geoFireLocation", boundingBox.getMaximumMatch());
    return this;
  }

  build() {
    return this.query;
  }
}
