/**
 * Splits the location string into an array and removes empty entries.
 *
 * @param location Location in string
 */
export function locationToArray(location: string): string[] {
  return location.split("/").filter(x => x);
}

/**
 * Appends the segment to the current location and makes it URI safe.
 *
 * @param currentLocation The current location.
 * @param segment The segment to add to the current location.
 */
export function appendToLocation(currentLocation: string, segment: string): string {
  return (currentLocation + "/" + encodeURIComponent(segment)).replace("//", "/");
}
