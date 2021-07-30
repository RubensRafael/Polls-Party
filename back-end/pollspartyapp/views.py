from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from pollspartyapp.models import Poll,Option,ControlField
from pollspartyapp.serializers import PollSerializer, OptionSerializer

# Create your views here.
class PollAuth(APIView):
	authentication_classes = [TokenAuthentication]
	permission_classes = [IsAuthenticated]
	
	def post(self,request,params):

			data = request.data
			poll = Poll.objects.create(question=data['question'],user=request.user)
			if data['config']['protect'] == True:
				poll.protect = True
				poll.save()
							
			for option in data['options']:
				Option.objects.create(answer=data['options'][option],poll=poll)
									
			if data['config']['all_options']:
				Option.objects.create(answer='All Options',poll=poll)
			elif data['config']['any_options']:
				Option.objects.create(answer='Any Option',poll=poll)

			serializer = PollSerializer(instance=poll)
			return JsonResponse(serializer.data,status=200,safe=False)

	def get(self,request,params):

		polls_query = Poll.objects.filter(user=request.user)		
		

		if params == 'all':
			serializer = serializer = PollSerializer(polls_query,many=True)
		else:
			url_fields = tuple(params.split('-'))
			serializer =  serializer = PollSerializer(polls_query,many=True,fields=url_fields)
			
			

		return JsonResponse(serializer.data,status=200,safe=False)

class PollUnAuth(APIView):

	def post(self,request,info,params):
		data = request.data
		poll = Poll.objects.get(options__pk=data.get('id'))

		if poll.protect:
			option = Option.objects.get(pk=data.get('id'))
			control = ControlField.objects.create(control_field=data['control_field'],option=option)
			option.votes += 1
			option.save()
			serializer = PollSerializer(instance=poll)
			return JsonResponse(serializer.data,status=200,safe=False)
		else:
			option = Option.objects.get(pk=data.get('id'))
			option.votes += 1
			option.save()
			serializer = PollSerializer(instance=poll)
			return JsonResponse(serializer.data,status=200,safe=False)	

	def get(self,request,info,params):

		try:
			poll = Poll.objects.get(pk=info)
			
		except:
			return JsonResponse({},status=404)


		if params == 'all':
			poll_serializer = PollSerializer(instance=poll)
		else:
			url_fields = tuple(params.split('-'))
			poll_serializer =  PollSerializer(instance=poll,fields=url_fields)



		if request.user == poll.user:
			options = Option.objects.filter(poll=poll)
			options_serializer = OptionSerializer(options,many=True,fields=('id','controllers'))
			data = {'poll':poll_serializer.data,'insights':options_serializer.data}
			return JsonResponse(data,status=200)
		else:
			return JsonResponse(poll_serializer.data,status=200)
		