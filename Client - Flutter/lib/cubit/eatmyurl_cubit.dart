import 'package:bloc/bloc.dart';
import 'package:eatmyurl/data/repository.dart';
import 'package:meta/meta.dart';

part 'eatmyurl_state.dart';

class EatmyurlCubit extends Cubit<EatmyurlState> {
  final Repository repository;
  EatmyurlCubit({required this.repository}) : super(EatmyurlInitial());

  void fetchnewurl(String url) {
    repository.fetchNewUrl(url).then((value) {
      emit(EatmyurlLoaded(data: value));
    });
  }
}
