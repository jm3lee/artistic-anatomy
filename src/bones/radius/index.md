{% from "templates/insertions.jinja" import insertions %}
{% from "templates/bony_landmarks.jinja" import bony_landmarks %}

## Bony Landmarks

{{ bony_landmarks('radius') }}

## Muscle Insertions

{{ insertions('radius') }}

## References

* [Wikipedia](https://en.wikipedia.org/wiki/Radius_(bone))
* {{ linktitle('gf') }}, 24-25.
