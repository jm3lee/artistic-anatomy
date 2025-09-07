{% extends "src/templates/template.html.jinja" %}
{% block content %}
{% from "src/templates/macros.jinja" import summary %}

{{summary("scm")}}

## References

* [Wikipedia](https://en.wikipedia.org/wiki/Sternocleidomastoid_muscle)
{% endblock %}
