{% extends "src/templates/template.html.jinja" %}
{% block content %}
{% from "src/templates/macros.jinja" import insertions, bony_landmarks, anchor %}

## Bony Landmarks

{{ bony_landmarks('radius') }}

## Muscle Insertions {{ anchor('insertions') }}

{{ insertions('radius') }}

## References

* [Wikipedia](https://en.wikipedia.org/wiki/Radius_(bone))
* {{ linktitle('gf') }}, 24-25.
{% endblock %}
