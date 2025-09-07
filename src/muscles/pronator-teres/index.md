{% extends "src/templates/template.html.jinja" %}
{% block content %}
{% from "src/templates/macros.jinja" import translations, summary %}


{{summary("protrs")}}

{{translations('protrs')}}

## References

* [Wikipedia](https://en.wikipedia.org/wiki/Pronator_teres_muscle)
{% endblock %}
