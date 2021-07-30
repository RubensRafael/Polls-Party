import random

def CreatePollToken():
	population = '123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
	sort = random.choices(population,k=6)
	token = ''.join(sort)
	return token


'''else:
				print('alou')	
		except:
			return JsonResponse({},status=404,safe=False)'''