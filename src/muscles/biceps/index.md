{% extends "src/templates/template.html.jinja" %}
{% block content %}
{% from "src/templates/macros.jinja" import summary, translations %}

{{summary("bc")}}

Supination is most powerful when the arm is flexed at 90 degrees.

{{translations('bc')}}

## Examples

## Related Muscles

## References

* [Wikipedia](https://en.wikipedia.org/wiki/Biceps)
* TGB 5th p95, Flashcard p21
* {{ linktitle('gf') }}, 168-170.
{% endblock %}
