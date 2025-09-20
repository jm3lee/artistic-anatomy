{% from "src/templates/macros.jinja" import summary_card, translations %}

## Summary

{{ summary_card(
  "pronator-teres",
  "./src/muscles/pronator-teres/fig1.yml"
) }}

{{ translations('pronator-teres') }}

## References

* {{ linktitle('pronator-teres-muscle-wikipedia') }}
