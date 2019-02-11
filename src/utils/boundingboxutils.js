class BoundingBoxUtils {
  mathUtils = new MathUtils();

  EARTH_RADIUS_KM = 6371.001;
  EARTH_RADIUS_MILES = 3958.756;

  MINIMUM_LATITUDE = this.mathUtils.toRadians(-90);  // -PI/2
  MAXIMUM_LATITUDE = this.mathUtils.toRadians(90);   //  PI/2
  MINIMUM_LONGITUDE = this.mathUtils.toRadians(-180); // -PI
  MAXIMUM_LONGITUDE = this.mathUtils.toRadians(180);  //  PI

  constructor(distanceUnit) {
    this.distanceUnit = distanceUnit;
  }

  getBoundingBox(queryLocation, distance) {
    if (distance < 0) {
      throw new IllegalArgumentException();
    }

    let distanceInRadians;
    switch (this.distanceUnit){
      case DistanceUnit().MILES:
        distanceInRadians = distance / EARTH_RADIUS_MILES;
        break;
      case DistanceUnit().KILOMETERS:
        distanceInRadians = distance / EARTH_RADIUS_KM;
        break;
      default:
        throw 500;
    }

    let minimumLatitude = queryLocation.getLatitude() - distanceInRadians;
    let maximumLatitude = queryLocation.getLatitude() + distanceInRadians;
    let minimumLongitude;
    let maximumLongitude;

    if (minimumLatitude > this.MINIMUM_LATITUDE && maximumLatitude < this.MAXIMUM_LATITUDE) {

      deltaLongitude = Math.asin(Math.sin(distanceInRadians) / Math.cos(queryLocation.getLatitude()));

      minimumLongitude = queryLocation.getLongitude() - deltaLongitude;
      if (minimumLongitude < this.MINIMUM_LONGITUDE) {
        minimumLongitude += 2 * Math.PI;
      }

      maximumLongitude = queryLocation.getLongitude() + deltaLongitude;
      if (maximumLongitude > this.MAXIMUM_LONGITUDE) {
        maximumLongitude -= 2 * Math.PI;
      }

    } else {
      minimumLatitude = Math.max(minimumLatitude, this.MINIMUM_LATITUDE);
      maximumLatitude = Math.min(maximumLatitude, this.MAXIMUM_LATITUDE);
      minimumLongitude = this.MINIMUM_LONGITUDE;
      maximumLongitude = this.MAXIMUM_LONGITUDE;
    }

    return new BoundingBox(minimumLatitude, minimumLongitude, maximumLatitude, maximumLongitude);
  }

}
