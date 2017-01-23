# this will process the data received
import requests, re, time
import sys
import pandas as pd

def get_latlong(address):
  try:
    url = 'http://dev.virtualearth.net/REST/v1/Locations?q='+address+'&key=AlAY-bnKDAZKs2G2IovGDZmM6RjLaT9eULsU0DhHd2pjh00rukW9otNQlqdmO1Pl'
    r = requests.get(url)
    answer = r.json()
    rsp = answer['resourceSets'][0]['resources'][0]['geocodePoints'][0]
    coors = rsp['coordinates']
    print coors, ",", address
  except requests.exceptions.ConnectionError:
    evictions.to_csv('out.csv', encoding="utf-8")
    print('waiting...')
    time.sleep(5)
  except TypeError:
    print 'type error'
    return None
  except ValueError:
    print 'json error'
    return None
  except IndexError:
    print answer
    print 'index error'
    return None

evictions = pd.read_csv('in.csv')
evictions['coors'] = evictions['address'].apply(get_latlong)

evictions.to_csv('out.csv', encoding="utf-8")
