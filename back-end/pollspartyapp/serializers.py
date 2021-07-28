from rest_framework import serializers
from pollspartyapp.models import Poll, Option
class OptionSerializer(serializers.ModelSerializer):
	class Meta:
		model = Option
		fields = ['answer', 'votes','id']

class PollSerializer(serializers.ModelSerializer):
	options = OptionSerializer(many=True, read_only=True)
	class Meta:
		model = Poll
		fields = ['id','question', 'total_votes', 'options']


     