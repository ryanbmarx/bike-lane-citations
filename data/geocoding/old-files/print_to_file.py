# this will process the data received
import requests, re, time
import sys
import pandas as pd

d = []
def get_latlong(record):
  with open("output.csv",'a') as f:
    try:
      url = 'http://dev.virtualearth.net/REST/v1/Locations?q='+record['location']+'&key=AlAY-bnKDAZKs2G2IovGDZmM6RjLaT9eULsU0DhHd2pjh00rukW9otNQlqdmO1Pl'
      r = requests.get(url)
      answer = r.json()
      rsp = answer['resourceSets'][0]['resources'][0]['geocodePoints'][0]
      coors = rsp['coordinates']
      d.append({'date':record['date'],'coors':coors,'lastname':record['lastname'],'firstname':record['firstname'],'orig_loc':record['orig_loc'],'anov_num':record['anov_num'],'violation':record['violation'],'location':record['location']})
      print coors, ",", record['location']
      pd.DataFrame(d).to_csv('bike-on-sidewalk-locs.csv', encoding="utf-8")

      return coors
    except requests.exceptions.ConnectionError:
      citations.to_csv('bike-on-sidewalk.csv', encoding="utf-8")
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

citations = pd.read_csv('bike-on-sidewalk.csv')
citations['coors'] = citations.apply(get_latlong, axis=1)
citations.to_csv('bike-on-sidewalk-locs.csv', encoding="utf-8")
