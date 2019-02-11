class QueryLocation {
  mathUtils = new MathUtils();

  MINIMUM_LATITUDE = this.mathUtils.toRadians(-90);  // -PI/2
  MAXIMUM_LATITUDE = this.mathUtils.toRadians(90);   //  PI/2
  MINIMUM_LONGITUDE = this.mathUtils.toRadians(-180); // -PI
  MAXIMUM_LONGITUDE = this.mathUtils.toRadians(180);  //  PI

  fromRadians(latitude, longitude) {
    this.latitude = latitude;
    this.longitude = longitude;
    this.checkBounds();
  }

  fromDegrees(latitude, longitude) {
    this.latitude = Math.toRadians(latitude);
    this.longitude = Math.toRadians(longitude);
    this.checkBounds();
  }

  checkBounds() {
    if (this.latitude < this.MINIMUM_LATITUDE || this.latitude > this.MAXIMUM_LATITUDE ||
        this.longitude < this.MINIMUM_LONGITUDE || this.longitude > this.MAXIMUM_LONGITUDE) {
      throw 500;

    }
  }

  getLatitude() {
    return this.latitude;
  }

  getLongitude() {
    return this.longitude;
  }

}
