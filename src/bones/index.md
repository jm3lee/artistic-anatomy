{% extends "src/templates/template.html.jinja" %}
{% block content %}
Explore skeletal anatomy entries below. For related muscles, visit
[Muscles](/muscles/) and for joint mechanics see
[Synovial Joints](/bones/synovial-joints/).

<div id="bones-indextree" class="indextree-root"
     data-src="/static/index/bones-indextree.json"></div>
{% endblock %}
