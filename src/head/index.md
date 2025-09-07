{% extends "src/templates/template.html.jinja" %}
{% block content %}
Explore facial landmarks and bony ridges essential for portrait work.
For muscle interactions, see [Muscles](/muscles/), and for skeletal
context, visit [Bones](/bones/).

<div id="head-indextree" class="indextree-root"
     data-src="/static/index/head-indextree.json"></div>
{% endblock %}
