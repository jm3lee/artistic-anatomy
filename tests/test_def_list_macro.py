from jinja2 import Environment, FileSystemLoader


def test_def_list_renders_attachment():
    env = Environment(loader=FileSystemLoader('src/templates'), autoescape=False)
    env.globals.update(
        render_jinja=lambda x: x,
        linkcap=lambda x: f'[{x}]',
        linkicon=lambda x: f'<{x}>'
    )
    tpl = env.from_string("{% from 'macros.jinja' import def_list %}{{ def_list('Origins', items) }}")
    items = [
        {'site': {'bone': 'scapula'}, 'label': 'Short head', 'note': 'Coracoid process'},
        {'site': {'bone': 'scapula', 'feature': 'supraglenoid-tubercle'}, 'label': 'Long head'},
        'extra'
    ]
    out = [line.strip() for line in tpl.render(items=items).splitlines() if line.strip()]
    assert '<dt>Origins</dt>' in out
    assert '<dd>Short head: Coracoid process of the <scapula></dd>' in out
    assert '<dd>Long head: [supraglenoid-tubercle] of the <scapula></dd>' in out
    assert '<dd>extra</dd>' in out
