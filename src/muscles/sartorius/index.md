{% extends "src/templates/template.html.jinja" %}
{% block content %}
{% from "src/templates/macros.jinja" import summary %}

{{summary("sartorius")}}
{% endblock %}
