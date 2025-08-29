{% from "templates/summary.jinja" import summary_bones %}
{% from "templates/bony_landmarks.jinja" import bony_landmarks %}
{% from "templates/origins.jinja" import origins %}
{% from "templates/insertions.jinja" import insertions %}

{{ summary_bones("calcaneus") }}

## Illustrations

## Bony Landmarks

{{ bony_landmarks("calcaneus") }}

## Muscle Origins {{'{#origins}'}}

{{ origins("calcaneus") }}

## Muscle Insertions

{{ insertions("calcaneus") }}

## References

* {{ linktitle('foot') }}
* [Wikipedia](https://en.wikipedia.org/wiki/Calcaneus)
