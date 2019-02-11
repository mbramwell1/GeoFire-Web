class BoundingBox {
  mathUtils = new MathUtils();

  constructor(minimumLatitude, minimumLongitude, maximumLatitude, maximumLongitude) {
    this.minimumLatitude = this.mathUtils.toRadians(minimumLatitude);
    this.minimumLongitude = this.mathUtils.toRadians(minimumLongitude);
    this.maximumLatitude = this.mathUtils.toRadians(maximumLatitude);
    this.maximumLongitude = this.mathUtils.toRadians(maximumLongitude);
    this.minimumMatch = (this.minimumLatitude+90)*180+this.minimumLongitude;
    this.maximumMatch = (this.maximumLatitude+90)*180+this.maximumLongitude;
  }

  getMinimumLatitude() {
    return this.minimumLatitude;
  }

  getMinimumLongitude() {
    return this.minimumLongitude;
  }

  getMaximumLatitude() {
    return this.maximumLatitude;
  }

  getMaximumLongitude() {
    return this.maximumLongitude;
  }

  getMinimumMatch(){
    return this.minimumMatch;
  }

  getMaximumMatch(){
    return this.maximumMatch;
  }
}
