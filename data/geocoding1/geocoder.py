# this will process the data received
import requests, re, time
import sys
import pandas as pd

def get_latlong(record):
  try:
    url = 'http://dev.virtualearth.net/REST/v1/Locations?q='+record["location"]+'&key=AlAY-bnKDAZKs2G2IovGDZmM6RjLaT9eULsU0DhHd2pjh00rukW9otNQlqdmO1Pl'
    r = requests.get(url)
    answer = r.json()
    rsp = answer['resourceSets'][0]['resources'][0]['geocodePoints'][0]
    coors = rsp['coordinates']
    print coors, ",", record["location"],",",record["id"]
    return coors
    
  except requests.exceptions.ConnectionError:
    citation.to_csv('failed-parking-on-bike-path.csv', encoding="utf-8")
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

citation = pd.read_csv('failed-parking-on-bike-path.csv')
citation['coors'] = citation.apply(get_latlong, axis=1)

citation.to_csv('failed-parking-on-bike-path-locs.csv', encoding="utf-8")
