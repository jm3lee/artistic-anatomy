{% extends "src/templates/template.html.jinja" %}
{% block content %}
{% from "src/templates/macros.jinja" import summary, translations %}

{{summary("fibularis-brevis")}}

## Illustrations

{{translations('fibularis-brevis')}}

## References

* [Wikipedia](https://en.wikipedia.org/wiki/Fibularis_brevis)
{% endblock %}
