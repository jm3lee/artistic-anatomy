{% from "src/templates/summary.jinja" import summary_bones %}
{% from "src/templates/bony_landmarks.jinja" import bony_landmarks %}
{% from "src/templates/origins.jinja" import origins %}
{% from "src/templates/insertions.jinja" import insertions %}
{% from "src/templates/anchor.jinja" import anchor %}

{{ summary_bones("calcaneus") }}

## Illustrations

## Bony Landmarks

{{ bony_landmarks("calcaneus") }}

## Muscle Origins {{ anchor('origins') }}

{{ origins("calcaneus") }}

## Muscle Insertions

{{ insertions("calcaneus") }}

## References

* {{ linktitle('foot') }}
* [Wikipedia](https://en.wikipedia.org/wiki/Calcaneus)
