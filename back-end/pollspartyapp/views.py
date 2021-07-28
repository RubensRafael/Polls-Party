from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from pollspartyapp.models import Poll,Option
from pollspartyapp.serializers import PollSerializer
from rest_framework.renderers import JSONRenderer
import io
from rest_framework.parsers import JSONParser
from rest_framework.renderers import JSONRenderer

# Create your views here.
class PollView(APIView):
	authentication_classes = [TokenAuthentication]
	permission_classes = [IsAuthenticated]
	
	def post(self,request,info):
		if info == 'create':
			data = request.data
			poll = Poll.objects.create(question=data['question'],user=request.user)
			if data['config'].get('protect') == True:
				poll.protect = True
							
			for option in data['options']:
				Option.objects.create(answer=data['options'][option],poll=poll)
									
			if data['config']['all_options']:
				Option.objects.create(answer='All Options',poll=poll)
			elif data['config']['any_options']:
				Option.objects.create(answer='Any Option',poll=poll)

			serializer = PollSerializer(instance=poll)
			return JsonResponse(serializer.data,status=200,safe=False)
		elif 'vote':
			data = request.data
			option = Option.objects.get(pk=data.get('id'))
			option.votes += 1
			option.save()
			poll = Poll.objects.get(options__pk=data.get('id'))
			serializer = PollSerializer(instance=poll)

			return JsonResponse(serializer.data,status=200,safe=False)

		
		

	def get(self,request,info):
		if info == 'view':
			polls_query = Poll.objects.filter(user=request.user)
			polls = []
			data = {'data':polls}

			for poll in polls_query:
				serializer = PollSerializer(instance=poll)
				polls.append(serializer.data)
			

			return JsonResponse(data,status=200,safe=False)
		else:
			try:
				poll = Poll.objects.get(pk=info)
				serializer = PollSerializer(instance=poll)
				return JsonResponse(serializer.data,status=200,safe=False)
			except:
				return JsonResponse({},status=404,safe=False)