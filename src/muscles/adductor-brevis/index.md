{% extends "src/templates/template.html.jinja" %}
{% block content %}
{% from "src/templates/macros.jinja" import summary %}

{{summary("adductor-brevis")}}

The **adductor brevis** is a small muscle on the inner thigh. It sits
between {{ link('adductor-longus') }} and {{ link('adductor-magnus') }},
drawing the {{ linkicon('femur') }} toward the midline.

## References

* [Wikipedia](https://en.wikipedia.org/wiki/Adductor_brevis_muscle)
{% endblock %}
