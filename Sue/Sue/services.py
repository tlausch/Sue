"""
The Templateservice will act as a pre-processor to deliver templates from TEMPLATEFOLDER
"""
from django.views.generic.base import TemplateView


class TemplateService(TemplateView):
    tempaltefolder = None

    def __init__(self, tempaltefolder=None):
        self.tempaltefolder = tempaltefolder

    def dispatch(self, request, template_name, *args, **kwargs):
        if self.tempaltefolder is not None:
            template_name = '%s/%s' % (self.tempaltefolder, template_name)

        self.template_name = template_name
        return super(TemplateService, self).dispatch(request, *args, **kwargs)
