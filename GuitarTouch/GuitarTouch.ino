#include <MPR121.h>
#include <Wire.h>

#define numElectrodes 12

void setup()
{
  Serial.begin(9600);
  while (!Serial);
  Wire.begin();

  if (!MPR121.begin(0x5C)) {
    Serial.println("error setting up MPR121");
    switch (MPR121.getError()) {
      case NO_ERROR:
        Serial.println("no error");
        break;
      case ADDRESS_UNKNOWN:
        Serial.println("incorrect address");
        break;
      case READBACK_FAIL:
        Serial.println("readback failure");
        break;
      case OVERCURRENT_FLAG:
        Serial.println("overcurrent on REXT pin");
        break;
      case OUT_OF_RANGE:
        Serial.println("electrode out of range");
        break;
      case NOT_INITED:
        Serial.println("not initialised");
        break;
      default:
        Serial.println("unknown error");
        break;
    }
    while (1);
  }

  MPR121.setInterruptPin(4);
  MPR121.setTouchThreshold(40);
  MPR121.setReleaseThreshold(20);
  MPR121.updateTouchData();
}

void loop()
{
  if (MPR121.touchStatusChanged()) {
    MPR121.updateTouchData();
    for (int i = 0; i < numElectrodes; i++) {
      if (MPR121.isNewRelease(i)) {
        Serial.print(0, HEX);
        Serial.print(i, HEX);
      } else if (MPR121.isNewTouch(i)) {
        Serial.print(1, HEX);
        Serial.print(i, HEX);
      }
    }
  }
}
